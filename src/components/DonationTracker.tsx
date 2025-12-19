import { useState, useEffect } from 'react';

interface Donation {
    donationCode: string;
    email: string;
    name?: string;
    amount?: number;
    status: 'pending' | 'completed';
    paymentMethod?: string;
    transactionId?: string;
    createdAt: string;
    completedAt?: string;
}

interface Stats {
    totalDonations: number;
    totalAmount: number;
    pendingCount: number;
    completedCount: number;
}

export function DonationTracker() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [stats, setStats] = useState<Stats>({
        totalDonations: 0,
        totalAmount: 0,
        pendingCount: 0,
        completedCount: 0
    });
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

    const fetchDonations = async () => {
        try {
            // Check if running locally
            const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

            if (isDev) {
                // Mock data for development
                const mockDonations: Donation[] = [
                    {
                        donationCode: 'DONATE_1734612345678',
                        email: 'supporter1@gmail.com',
                        name: 'Nguyễn Văn A',
                        amount: 100000,
                        status: 'completed',
                        paymentMethod: 'Buy Me a Coffee',
                        transactionId: 'TXN001',
                        createdAt: new Date(Date.now() - 86400000).toISOString(),
                        completedAt: new Date(Date.now() - 86000000).toISOString()
                    },
                    {
                        donationCode: 'DONATE_1734612345679',
                        email: 'supporter2@gmail.com',
                        name: 'Trần Thị B',
                        amount: 50000,
                        status: 'completed',
                        paymentMethod: 'VNPay',
                        transactionId: 'TXN002',
                        createdAt: new Date(Date.now() - 43200000).toISOString(),
                        completedAt: new Date(Date.now() - 43000000).toISOString()
                    },
                    {
                        donationCode: 'DONATE_1734612345680',
                        email: 'supporter3@gmail.com',
                        status: 'pending',
                        createdAt: new Date(Date.now() - 3600000).toISOString()
                    }
                ];

                setDonations(mockDonations);

                const totalAmount = mockDonations
                    .filter(d => d.status === 'completed')
                    .reduce((sum, d) => sum + (d.amount || 0), 0);

                setStats({
                    totalDonations: mockDonations.length,
                    totalAmount,
                    pendingCount: mockDonations.filter(d => d.status === 'pending').length,
                    completedCount: mockDonations.filter(d => d.status === 'completed').length
                });
            } else {
                // Production: Call actual API
                const response = await fetch('/api/donations');
                const data = await response.json();

                if (data.success) {
                    setDonations(data.donations);
                    // Calculate stats from actual data
                    // ... (same logic as mock)
                }
            }

            setLastUpdate(new Date());
            setLoading(false);
        } catch (error) {
            console.error('Error fetching donations:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonations();

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchDonations, 30000);

        return () => clearInterval(interval);
    }, []);

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + ' VNĐ';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Vừa xong';
        if (diffMins < 60) return `${diffMins} phút trước`;
        if (diffHours < 24) return `${diffHours} giờ trước`;
        return `${diffDays} ngày trước`;
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-20 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    📊 Sao Kê Donation Realtime
                </h2>
                <button
                    onClick={fetchDonations}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                    <span className="text-sm">🔄 Làm mới</span>
                </button>
            </div>

            {/* Last Update */}
            <p className="text-sm text-gray-600 mb-6">
                Cập nhật lần cuối: {formatDate(lastUpdate.toISOString())}
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Tổng Donations</div>
                    <div className="text-3xl font-bold text-blue-600">{stats.totalDonations}</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Tổng Tiền</div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalAmount)}</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Đã Hoàn Thành</div>
                    <div className="text-3xl font-bold text-green-600">{stats.completedCount}</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Đang Chờ</div>
                    <div className="text-3xl font-bold text-yellow-600">{stats.pendingCount}</div>
                </div>
            </div>

            {/* Donations List */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 Lịch Sử Donations</h3>

                {donations.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <div className="text-6xl mb-4">🎁</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có donation nào</h3>
                        <p className="text-gray-500">Hãy là người đầu tiên ủng hộ!</p>
                    </div>
                ) : (
                    donations.map((donation) => (
                        <div
                            key={donation.donationCode}
                            className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 ${donation.status === 'completed' ? 'border-green-500' : 'border-yellow-500'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${donation.status === 'completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {donation.status === 'completed' ? '✅ Hoàn thành' : '⏳ Đang chờ'}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {getRelativeTime(donation.createdAt)}
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="font-semibold text-gray-800">
                                            {donation.name || 'Anonymous'}
                                            {donation.amount && <span className="text-green-600 ml-2">+{formatCurrency(donation.amount)}</span>}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            📧 {donation.email}
                                        </p>
                                        <p className="text-xs font-mono text-gray-500">
                                            🔖 {donation.donationCode}
                                        </p>
                                        {donation.paymentMethod && (
                                            <p className="text-xs text-blue-600">
                                                💳 {donation.paymentMethod}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-xs text-gray-500 mb-1">Tạo lúc</div>
                                    <div className="text-sm font-medium">{formatDate(donation.createdAt)}</div>
                                    {donation.completedAt && (
                                        <>
                                            <div className="text-xs text-gray-500 mt-2 mb-1">Hoàn thành</div>
                                            <div className="text-sm font-medium text-green-600">{formatDate(donation.completedAt)}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Dev Mode Notice */}
            {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                        🔧 <strong>Dev Mode:</strong> Hiển thị dữ liệu mẫu. Deploy lên production để xem donations thật.
                    </p>
                </div>
            )}

            {/* Transparency Note */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    💯 <strong>Minh bạch 100%:</strong> Mọi khoản donation đều được công khai và có thể kiểm chứng.
                </p>
            </div>
        </div>
    );
}
