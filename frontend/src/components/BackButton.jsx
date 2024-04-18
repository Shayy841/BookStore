import { Link } from "react-router-dom"
import { TiArrowBack } from "react-icons/ti";

const BackButton = ({ destination = '/' }) => {
    return <div className="flex">
        <Link to={destination} className="bg-sky-400 text-white px-4 py-1 rounded-lg w-fit">
            <TiArrowBack className="text-3xl" />   </Link>
    </div>
}

export default BackButton;