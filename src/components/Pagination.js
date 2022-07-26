import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
const Pagination = (props) => {
  const { pageBtns, handlePageClick, handleDeleteAll } = props;
  return (
    <>
      <div class="pagination" style={{ display: "flex", direction: "row" }}>
        <div>
          <Chip
            variant="outlined"
            color="warning"
            endDecorator={<ChipDelete variant="plain" />}
            onClick={handleDeleteAll}
          >
            Delete Selected
          </Chip>
        </div>
        <div>
          <button onClick={handlePageClick}>&lt;&lt;</button>
          <button onClick={handlePageClick}>Previous</button>
          {pageBtns.map((elem) => {
            return <button onClick={handlePageClick}>{elem}</button>;
          })}
          <button onClick={handlePageClick}>Next</button>
          <button onClick={handlePageClick}>&gt;&gt;</button>
        </div>
      </div>
      ;
    </>
  );
};

export default Pagination;
