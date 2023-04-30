import { useContext, useState } from "react";
import CardList from "../../components/CardList/card-list";
import Sort from "../../components/Sort/sort";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { SortContext } from "../../context/sortContext";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { NotFound } from "../../components/NotFound/NotFound";

const tabs = [
  {
    id: "by time",
    title: "По времени",
  },
  {
    id: "by likes",
    title: "По лайков",
  },
  {
    id: "by comments",
    title: "По комментариев",
  },
];

export const CatalogPage = () => {
  const { cards } = useContext(CardContext);
  const { selectedTabId, setSelectedTabId } = useContext(SortContext);
  const isLoading = useSelector((state) => state.registration.isLoading);
  const error = useSelector((state) => state.registration.error);
  const [sortOrder, setSortOrder] = useState("desc");
  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Sort
            tabs={tabs}
            currentSort={selectedTabId}
            sortOrder={sortOrder} 
            setSortOrder={setSortOrder}
            onChangeSort={(tabId) => {
              setSelectedTabId(tabId);
            }}
          />
          <div className="content__cards">
            <CardList cards={cards} sortOrder={sortOrder}/>
          </div>
        </div>
      )}
      {!isLoading && error && <NotFound />}
    </Box>
  );
};
