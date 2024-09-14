import { Link } from "react-router-dom";

interface ToggleLink {
    text: string,
    linkText: string,
    onClick: () => void
}

const LoginToggleLink: React.FC<ToggleLink> = ({ text, linkText, onClick }) => {
    return (
        <>
            <h2 className="mb-6 text-center">
                {text}&emsp;
                <Link
                    to="#"
                    onClick={onClick}
                    className="text-black font-bold underline cursor-pointer"
                >
                    {linkText}
                </Link>
            </h2>
        </>
    );
}

export default LoginToggleLink;
