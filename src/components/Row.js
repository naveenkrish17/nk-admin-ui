import { RiEditBoxFill, RiDeleteBin7Line } from "react-icons/ri";

const Row = (props) => {
  const { elem, handleSelect, handleDelete } = props;

  return (
    <tr id={elem.id} align="left">
      <td>
        <input
          onClick={handleSelect}
          id={elem.id}
          type="checkbox"
          checked={elem.checked}
        ></input>
      </td>
      <td>{elem.name}</td>
      <td>{elem.email}</td>
      <td>{elem.role}</td>
      <td align="center">
        <RiEditBoxFill />
        <RiDeleteBin7Line id={elem.id} onClick={handleDelete} />
      </td>
    </tr>
  );
};
export default Row;
