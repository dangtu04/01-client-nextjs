'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                MyApp ©{new Date().getFullYear()} Created by DangTu
            </Footer>
        </>
    )
}

export default AdminFooter;