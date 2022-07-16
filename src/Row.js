import { RiEditBoxFill, RiDeleteBin7Line } from "react-icons/ri";

const Row = (props) => {



  
  return (
    <>
      <tr align="left">
        <td>
          <input type="checkbox" checked={props.checked}></input>
        </td>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.role}</td>
        <td align="center">
          <RiEditBoxFill />
          <RiDeleteBin7Line />
        </td>
      </tr>
    </>
  );
};
export default Row;
