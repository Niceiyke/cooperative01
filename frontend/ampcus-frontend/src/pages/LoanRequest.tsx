import Navbar from '../components/Navbar'
import SplitScreen from '../layouts/SplitScreen'
import Sidebar from '../components/Sidebar'
import LoanRequestForm from '../components/LoanRequestForm'

function LoanRequestPage() {
    return (
        <div>
            <Navbar />
            <SplitScreen left={Sidebar} right={LoanRequestForm} />
        </div>
    )
}

export default LoanRequestPage