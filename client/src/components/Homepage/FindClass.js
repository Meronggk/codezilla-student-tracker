import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function SearchBox() {
    const [sessionId, setSessionId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/getSessionData?id=${sessionId}`)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="sessionId">
                <Form.Label>Search by Session ID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Session ID"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Search
            </Button>
        </Form>
    );
}
// eslint-disable-next-line no-undef
export default FindClass;