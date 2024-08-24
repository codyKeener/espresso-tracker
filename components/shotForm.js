import { FloatingLabel, Form } from 'react-bootstrap';

export default function ShotForm() {
  return (
    <>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px',
      }}
      >
        <h1 style={{ margin: '12px' }}>What&apos;s Brewing?</h1>
        <Form style={{ width: '80%' }}>
          <FloatingLabel controlId="floatingInput1" label="Beans">
            <Form.Control
              type="text"
              placeholder="Choose your beans"
              name="beans"
              required
            />
          </FloatingLabel>
        </Form>
      </div>
    </>
  );
}
