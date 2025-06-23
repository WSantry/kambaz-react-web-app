// no react declared
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

interface Option {
  id: string;
  text: string;
}

export default function QuestionEditor() {
  const { cid, qid, qqid } = useParams<{ cid?: string; qid?: string; qqid?: string }>();

  const [prompt, setPrompt]   = useState("");
  const [type, setType]       = useState<"MC" | "TF">("MC");
  const [options, setOptions] = useState<Option[]>([
    { id: "1", text: "" },
    { id: "2", text: "" },
  ]);
  const [answer, setAnswer]   = useState("");

  const changeOption = (id: string, text: string) =>
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, text } : o)));

  const addOption    = () =>
    setOptions((prev) => [...prev, { id: Date.now().toString(), text: "" }]);

  const removeOption = (id: string) =>
    setOptions((prev) => prev.filter((o) => o.id !== id));

  const save = () => {
    // TODO: replace with real persistence
    console.log({ cid, qid, qqid, prompt, type, options, answer });
  };

  return (
    <Card>
      <Card.Header>Edit Question</Card.Header>

      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Prompt</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value as "MC" | "TF")}
            >
              <option value="MC">Multiple Choice</option>
              <option value="TF">True / False</option>
            </Form.Select>
          </Form.Group>

          {type === "MC" && (
            <>
              <h6 className="fw-bold">Options</h6>
              {options.map((o, i) => (
                <Form.Group key={o.id} className="mb-2 d-flex">
                  <Form.Control
                    placeholder={`Option ${i + 1}`}
                    value={o.text}
                    onChange={(e) => changeOption(o.id, e.target.value)}
                  />
                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => removeOption(o.id)}
                  >
                    &times;
                  </Button>
                </Form.Group>
              ))}
              <Button size="sm" variant="outline-primary" onClick={addOption}>
                + Add option
              </Button>
            </>
          )}

          <Form.Group className="mt-4">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Card.Body>

      <Card.Footer className="text-end">
        <Button onClick={save}>Save</Button>
      </Card.Footer>
    </Card>
  );
}
