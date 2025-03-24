import { useState } from "react";
import "./book-choice.css"
import { useNavigate } from "react-router-dom";

function BookData() {
    const today = new Date().toISOString().split("T")[0];   // 2025-03-24
    const maxDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const [numBook, setNumBook] = useState(1)
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState(""); // 用于捕捉用户选择的时间
    const [isSubmit, setIsSubmit] = useState(false);

    const navigate = useNavigate();

    function PlusNum() {
        if (numBook >= 10) {
            alert("Sorry, we don't have a table that can fit more than 10 people.");
        } else {
            setNumBook(prevNum => prevNum + 1);
        }
    }

    function MinuxNum() {
        if (numBook <= 0) {
            alert("Sorry, we don't have a table can put 10 people.")
        } else {
            setNumBook(prevNum => prevNum - 1)
        }
    }

    function recordNum(e) {
        const currentNum = parseInt(e.target.value);
        if (!isNaN(currentNum)) {
            if (currentNum < 1) {
                alert("Cannot book a table for less than 1 person.");
                setNumBook(1); // 重置为最小值
            } else if (currentNum > 10) {
                alert("Sorry, we don't have a table that can accommodate more than 10 people.");
                setNumBook(10); // 重置为最大值
            } else {
                setNumBook(currentNum);
            }
        }
    }

    function checkDate(e) {
        const currentDate = e.target.value;

        if (currentDate < today || currentDate > maxDate) {
            alert("Please choose a date within the next 10 days.");
            setSelectedDate(today);  // 如果超出范围，重置为今天
        } else {
            setSelectedDate(currentDate);  // 更新为用户选择的日期
        }
    }

    function checkInform() {
        if (!selectedTime) {
            alert("Please select a time before submitting.");
            return;
        }
        setIsSubmit(true);
        alert(`Number: ${numBook}\nDate: ${selectedDate}\nTime: ${selectedTime}`);

        setTimeout(() => {
            setIsSubmit(false);
            navigate("/confirm-booking");  // 跳转到确认页面
        }, 500);  // 模拟提交处理过程
    }

    function handleTimeChange(e) {
        setSelectedTime(e.target.value);
    }

    return (
        <div className="bookChoice">
            <div>
                <span>Number for Booking: </span>
                <input
                    id="number"
                    type="number"
                    min="1"
                    max="10"
                    value={numBook}
                    onChange={recordNum}
                />
                <button onClick={PlusNum}>Plus</button>
                <button onClick={MinuxNum}>Minus</button>
            </div>

            <div>
                <span>Booking Date: </span>
                <input
                    id="date"
                    type="date"
                    min={today}
                    max={maxDate}
                    value={selectedDate}
                    onChange={checkDate}
                />
            </div>

            <div>
                <label>Select the time: </label>
                <input
                    list="datalist-id"
                    name="input-name"
                    value={selectedTime}
                    onChange={handleTimeChange} />
                <datalist id="datalist-id">
                    <option value="10am ~ 12am"></option>
                    <option value="13pm ~ 15pm"></option>
                    <option value="15pm ~ 17pm"></option>
                    <option value="17pm ~ 19pm"></option>
                    <option value="19pm ~ 21pm"></option>
                </datalist>
            </div>

            <button onClick={checkInform} disabled={isSubmit}>Submit</button>
        </div>
    )
}

export default BookData;