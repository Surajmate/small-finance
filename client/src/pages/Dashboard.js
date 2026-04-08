import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../utils/auth";
import EMIChart from "../components/EMIChart";
import jsPDF from "jspdf";

function Dashboard() {
    const [loans, setLoans] = useState([]);
    const [result, setResult] = useState(null);
    const [emiData, setEmiData] = useState([]);
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(10);
    const [time, setTime] = useState(2);
    const [emi, setEmi] = useState(0);

    const fetchLoans = async () => {
        const res = await api.get("/loan");
        setLoans(res.data);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.text("Loan Report", 20, 20);

        doc.text(`Amount: ₹${result.amount}`, 20, 40);
        doc.text(`Interest: ₹${result.interest}`, 20, 50);
        doc.text(`Total: ₹${result.total}`, 20, 60);

        doc.save("loan-report.pdf");
    };

    const handleCalculate = async () => {
        try {
            if (!amount || !rate || !time) {
                alert("Please fill all fields");
                return;
            }

            const res = await api.post("/loan", {
                amount: Number(amount),
                rate: Number(rate),
                time: Number(time),
            });

            setResult(res.data);

            const data = generateEMIData(
                Number(amount),
                Number(rate),
                Number(time)
            );

            setEmiData(data);

            fetchLoans(); // refresh history
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    const generateEMIData = (amount, rate, time) => {
        const monthlyRate = rate / 12 / 100;
        const months = time * 12;

        const emi =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

        let balance = amount;
        let data = [];

        for (let i = 1; i <= months; i++) {
            const interest = balance * monthlyRate;
            const principal = emi - interest;

            balance -= principal;

            data.push({
                month: i,
                interest: interest.toFixed(2),
                principal: principal.toFixed(2),
            });
        }

        return data;
    };

    const calculateEMI = (amount, rate, time) => {
        const monthlyRate = rate / 12 / 100;
        const months = time * 12;

        const emi =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

        return emi.toFixed(2);
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    useEffect(() => {
        const monthlyRate = rate / 12 / 100;
        const months = time * 12;

        const emiValue =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

        if (!isNaN(emiValue)) {
            setEmi(emiValue.toFixed(2));
        }
    }, [amount, rate, time]);

    return (
        <div className="dashboard">
            {/* Header */}
            {/* <div className="header">
                <h2>Loan Dashboard</h2>
                <button onClick={logout}>Logout</button>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Loan Amount</p>
                    <h2 className="text-2xl font-bold">₹{amount}</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Total Interest</p>
                    <h2 className="text-2xl font-bold">
                        ₹{result?.interest || 0}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Total Payable</p>
                    <h2 className="text-2xl font-bold">
                        ₹{result?.total || 0}
                    </h2>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h3>EMI Calculator</h3>

                {/* Amount */}
                <label>Loan Amount: ₹{amount}</label>
                <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />

                {/* Rate */}
                <label>Interest Rate: {rate}%</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                />

                {/* Time */}
                <label>Time: {time} years</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                />

                {/* Live EMI */}
                <h2>Monthly EMI: ₹{emi}</h2>

                {/* Save Loan */}
                <button onClick={handleCalculate}>
                    Apply Loan
                </button>
            </div>

            {/* <button onClick={handleCalculate}>Calculate Loan</button> */}

            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h3 className="text-lg font-semibold mb-4">
                    EMI Breakdown
                    {result && (
                        <>
                            <button onClick={downloadPDF}>Download Report</button>

                            <div>
                                <p>Amount: ₹{result.amount}</p>
                                <p>Interest: ₹{result.interest}</p>
                                <p>Total: ₹{result.total}</p>
                            </div>
                        </>
                    )}
                </h3>
                {emiData.length > 0 && <EMIChart data={emiData} />}
            </div>

            {/* Loan History */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">
                    Loan History
                </h3>

                <table className="w-full text-center">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th>Amount</th>
                            <th>EMI</th>
                            <th>Rate (%)</th>
                            <th>Time (Years)</th>
                            <th>Interest</th>
                            <th>Total</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan._id}>
                                <td>₹{loan.amount}</td>
                                <td>₹{calculateEMI(loan.amount, loan.rate, loan.time)}</td>
                                <td>{loan.rate}</td>
                                <td>{loan.time}</td>
                                <td>₹{loan.interest}</td>
                                <td>₹{loan.total}</td>
                                <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={downloadPDF}>Download Report</button>
        </div>
    );
}

export default Dashboard;