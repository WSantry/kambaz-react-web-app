// src/Kambaz/Courses/Quizzes/Preview.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Pagination, Button } from "react-bootstrap";
import { marked } from "marked";        // ← named export (v4+)
import * as api from "./client";

interface Question {
  _id: string;
  body: string;
  // add more fields later if you need them
}

export default function Preview() {
  const { qid } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [cursor, setCursor] = useState(0);

  /* fetch quiz questions once qid is known */
  useEffect(() => {
    (async () => {
      if (qid) {
        const list = await api.listQuestions(qid);
        setQuestions(list);
      }
    })();
  }, [qid]);

  if (!questions.length) return null;

  const q = questions[cursor];

  return (
    <div className="p-3">
      <h3>Preview</h3>

      <Card className="mb-3">
        <Card.Body>
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(q.body ?? ""),
            }}
          />
        </Card.Body>
      </Card>

      <Pagination>
        {questions.map((_, i) => (
          <Pagination.Item
            key={i}
            active={i === cursor}
            onClick={() => setCursor(i)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Button disabled>Submit (disabled in preview)</Button>
    </div>
  );
}
