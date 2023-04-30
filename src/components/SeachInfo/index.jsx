import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import "./index.css";
import { useLocation } from "react-router-dom";

const SeachInfo = ({searchText}) => {
	const { total } = useContext(CardContext);
	const location = useLocation()
	const searchCount = total;

	return (
		location.pathname === "/post" &&(searchText && <section className="search-title">
	По запросу <span>{searchText}</span> найдено {searchCount} товаров
</section>)
		
	);
};

export default SeachInfo;
