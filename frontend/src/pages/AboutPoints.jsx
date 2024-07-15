import React from 'react'

export default function AboutPoints() {
    return (
        <div className="container lg:mt-10 px-6 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-3">Điểm tích lũy dành cho khách hàng</h3>
            <ul className="list-item mt-3 ml-4">
                <li className="list-disc list-inside">Thành viên <span className='font-semibold text-accent'>đồng</span>: 0 - 99 điểm - Giảm 0% trên toàn hóa đơn</li>
                <li className="list-disc list-inside">Thành viên <span className='font-semibold text-accent'>bạc</span>: 100 - 199 điểm - Giảm 3% trên toàn hóa đơn</li>
                <li className="list-disc list-inside">Thành viên <span className='font-semibold text-accent'>vàng</span>: 200 - 299 điểm - Giảm 5% trên toàn hóa đơn</li>
                <li className="list-disc list-inside">Thành viên <span className='font-semibold text-accent'>bạch kim</span>: 300 - 399 điểm - Giảm 10% trên toàn hóa đơn</li>
                <li className="list-disc list-inside">Thành viên <span className='font-semibold text-accent'>kim cương</span>: 400 điểm trở lên - Giảm 15% trên toàn hóa đơn</li>
            </ul>
        </div>

    )
}
