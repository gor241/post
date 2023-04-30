import cn from "classnames";
import "./index.css";
const Sort = ({ currentSort, tabs, onChangeSort, sortOrder, setSortOrder }) => {
  const handleClick =
    (e, tab) => {
      e.preventDefault();
      if (currentSort === tab.id) {
        setSortOrder(sortOrder === "desc" ? "asc" : "desc");
      } else {
        setSortOrder("desc");
      }
      onChangeSort(tab.id);
    };
  return (
    <div className="sort content__sort">
      {tabs.map((tab) => (
        <div
          className={cn("sort__link", {
            sort__link_selected: currentSort === tab.id,
          })}
          key={tab.id}
          id={tab.id}
        >
          <a onClick={(e) => handleClick(e, tab)}>
            {tab.title}
            {currentSort === tab.id && (sortOrder === "desc" ? "▼" : "▲")}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Sort;
