import { useNavigate } from 'react-router-dom';

// pages/HomePage.jsx
export default function HomePage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // xử lý login thành công xong chuyển trang
        navigate('/about');
    };


    return (
        <div>
            <h1>Trang chủ</h1>
            <button onClick={handleLogin}>Đăng nhập</button>;
        </div>
    )
}
