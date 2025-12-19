import { useState } from 'react';
import { sanitizeInput, isValidEmail } from '../utils/validation';

interface DonationFormProps {
    onSuccess?: (donationCode: string) => void;
}

export function DonationForm({ onSuccess }: DonationFormProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [donationCode, setDonationCode] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate email
            if (!email || !isValidEmail(email)) {
                throw new Error('Vui lòng nhập email hợp lệ');
            }

            // Check if running in development mode (local)
            const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

            let donationCodeValue: string;

            if (isDev) {
                // Development mode: Generate code locally without API call
                console.log('🔧 Development mode: Generating donation code locally');
                donationCodeValue = `DONATE_${Date.now()}${Math.floor(Math.random() * 10000)}`;

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500));

                console.log('✅ Generated code:', donationCodeValue);
                console.log('📧 Email would be sent to:', email);
                console.log('👤 Name:', name || 'Anonymous');
            } else {
                // Production mode: Call actual API
                const response = await fetch('/api/donation/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: sanitizeInput(email),
                        name: sanitizeInput(name),
                        language: 'vi'
                    }),
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.error || 'Có lỗi xảy ra, vui lòng thử lại');
                }

                donationCodeValue = data.donationCode;
            }

            // Success
            setDonationCode(donationCodeValue);
            setShowSuccess(true);

            if (onSuccess) {
                onSuccess(donationCodeValue);
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(donationCode);
        // Optional: Show toast notification
    };

    if (showSuccess && donationCode) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">
                        Đăng ký thành công!
                    </h3>
                    <p className="text-gray-600">
                        {window.location.hostname === 'localhost'
                            ? 'Đây là chế độ TEST (local development)'
                            : `Chúng tôi đã gửi email xác nhận đến `}
                        <strong>{email}</strong>
                    </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mb-6">
                    <p className="text-sm text-gray-700 mb-3 font-semibold">
                        📝 Mã donation của bạn:
                    </p>
                    <div className="flex items-center gap-2 bg-white p-4 rounded-lg">
                        <code className="flex-1 font-mono text-lg font-bold text-purple-600">
                            {donationCode}
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            📋 Copy
                        </button>
                    </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                        <strong>⚠️ Quan trọng:</strong> Vui lòng ghi mã này vào nội dung chuyển khoản
                        để chúng tôi có thể gửi email cảm ơn cho bạn!
                    </p>
                </div>

                <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">📱 Các bước tiếp theo:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                        <li>Copy mã donation ở trên</li>
                        <li>Chuyển khoản qua Buy Me a Coffee hoặc banking</li>
                        <li>Nhập mã vào phần lời nhắn/nội dung chuyển khoản</li>
                        <li>Nhận email cảm ơn tự động!</li>
                    </ol>
                </div>

                <button
                    onClick={() => {
                        setShowSuccess(false);
                        setDonationCode('');
                        setEmail('');
                        setName('');
                    }}
                    className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors"
                >
                    Đăng ký mới
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                📧 Nhận email cảm ơn tự động
            </h3>

            <p className="text-sm text-gray-600 mb-6">
                Nhập email để nhận mã donation và email xác nhận sau khi bạn donate
            </p>

            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Tên của bạn (tuỳ chọn)
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                        }`}
                >
                    {loading ? '⏳ Đang xử lý...' : '✨ Nhận mã donation'}
                </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                    💡 <strong>Lưu ý:</strong> Email của bạn chỉ dùng để gửi thông báo donation.
                    Chúng tôi cam kết không spam hoặc chia sẻ email của bạn.
                </p>
            </div>

            {window.location.hostname === 'localhost' && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-800">
                        🔧 <strong>Dev Mode:</strong> Email không được gửi khi test local.
                        Deploy lên Vercel để kích hoạt email automation.
                    </p>
                </div>
            )}
        </form>
    );
}
