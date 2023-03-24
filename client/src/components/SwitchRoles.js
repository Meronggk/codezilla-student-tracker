import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const SwitchRoles = ({ role, setRole }) => {
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
			>
				<Dropdown.Item eventKey="Trainee">Trainee</Dropdown.Item>
				<Dropdown.Item eventKey="Volunteer">Volunteer</Dropdown.Item>
			</DropdownButton>
		</div>
	);
};

export default SwitchRoles;
