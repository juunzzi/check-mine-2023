import UserAccountInfo from 'src/@components/user/UserPaymentInfo/UserAccountInfo'
import UserBarcodeInfo from 'src/@components/user/UserPaymentInfo/UserBarcodeInfo'
import UserPointInfo from 'src/@components/user/UserPaymentInfo/UserPointInfo'

const UserPaymentInfo = () => {
    return (
        <div>
            <UserBarcodeInfo />
            <UserPointInfo />
            <UserAccountInfo />
        </div>
    )
}

export default UserPaymentInfo
