import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import RoleContext from "./RoleContext";

const SwitchRoles = () => {
	//const [role, setRole] = useState("Trainee");
	const [role, setRole] = useContext(RoleContext);

	const handleRoleChange = (eventKey) => {
		setRole(eventKey);
		fetch("/api/changerole", {
			method: "POST",
			body: JSON.stringify({
				role: eventKey,
			}),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<DropdownButton
				id="SwitchRoles-dropdown"
				title={role || "selectRole"}
				onSelect={handleRoleChange}
				style={{ fontSize: "25px" }}
			>
				<Dropdown.Item eventKey="Trainee" style={{ fontSize: "25px" }}>
					Trainee
				</Dropdown.Item>
				<Dropdown.Item eventKey="Volunteer" style={{ fontSize: "25px" }}>
					Volunteer
				</Dropdown.Item>
			</DropdownButton>
		</div>
	);
};

export default SwitchRoles;
