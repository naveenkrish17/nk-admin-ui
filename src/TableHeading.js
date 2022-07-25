const Heading = (props) => {
  const { handleSelectAll } = props;
  return (
    <tr align="left">
      <input onClick={handleSelectAll} type="checkbox"></input>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th align="center">Actions</th>
    </tr>
  );
};
export default Heading;
