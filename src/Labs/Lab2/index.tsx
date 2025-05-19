import { Container, Row, Col, Table, ListGroup, Form, Button, FormGroup, FormControl, FormLabel, FormSelect, InputGroup, Nav, Card } from "react-bootstrap";
import "./index.css";
// React Icons
import { VscAccount } from "react-icons/vsc";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookBible, FaCalendar, FaEnvelopeOpenText, FaRegClock } from "react-icons/fa6";

export default function Lab2() {

  return (
    <Container fluid="md" /* md = small horizontal margin, fluid="md" = responsive */>
      <h2>Lab 2 - Cascading Style Sheets</h2>

      {/* 1. Demonstrate ID selectors */}
      <h3>ID Selectors</h3>
      <p id="wd-id-selector-1">
        This paragraph is white on red background (see index.css).
      </p>
      <p id="wd-id-selector-2">
        This paragraph is black on yellow background (see index.css).
      </p>

      {/* 2. Demonstrate Class selectors */}
      <h3>Class Selectors</h3>
      <p className="wd-class-selector">
        This paragraph is blue on yellow (see index.css).
      </p>
      <h4 className="wd-class-selector">
        This heading also is blue on yellow (see index.css).
      </h4>

      {/* 3. Document structure example */}
      <h3>Document Structure Selectors</h3>
      <div className="wd-selector-1">
        <div className="wd-selector-2">
          Red background and white text inside .wd-selector-1 .wd-selector-3
          <p className="wd-selector-3">
            This is white on red
            <br />
            <span className="wd-selector-4">
              This small span is blue on yellow
            </span>
          </p>
        </div>
      </div>

      {/* 4. Foreground Colors */}
      <h3>Foreground Colors</h3>
      <h4 className="wd-fg-color-blue">
        Blue on white heading
      </h4>
      <p className="wd-fg-color-red">
        Red on white text
      </p>
      <p className="wd-fg-color-green">
        Green on white text
      </p>

      {/* 5. Background Colors */}
      <h3>Background Colors</h3>
      <h4 className="wd-bg-color-blue wd-fg-color-white">
        White on blue heading
      </h4>
      <p className="wd-bg-color-red wd-fg-color-black">
        Black on red paragraph
        <span className="wd-bg-color-green wd-fg-color-white ms-2">
          White on green span
        </span>
      </p>

      {/* 6. Borders */}
      <h3>CSS Borders</h3>
      <p className="wd-border-fat wd-border-red wd-border-solid mb-3">
        Fat red border
      </p>
      <p className="wd-border-thin wd-border-blue wd-border-dashed mb-3">
        Thin blue dashed border
      </p>

      {/* 7. Margins & Padding Demonstration */}
      <h3>Margins & Paddings</h3>
      <div
        className="wd-padded-top-left
                   wd-border-fat wd-border-red wd-border-solid
                   wd-bg-color-yellow
                   mb-3"
      >
        Fat red border with yellow background & big padding top/left
      </div>
      <div
        className="wd-padded-bottom-right
                   wd-border-fat wd-border-blue wd-border-solid
                   wd-bg-color-yellow
                   mb-3"
      >
        Fat blue border with yellow background & big padding bottom/right
      </div>
      <div
        className="wd-padding-fat
                   wd-border-fat wd-border-yellow wd-border-solid
                   wd-bg-color-blue wd-fg-color-white
                   mb-3"
      >
        Fat yellow border with blue background & big padding all around
      </div>
      <div
        className="wd-margin-bottom
                   wd-padded-top-left
                   wd-border-fat wd-border-red
                   wd-border-solid wd-bg-color-yellow
                   mb-3"
      >
        Fat red border with yellow background & margin at bottom
      </div>
      <div
        className="
          wd-margin-right-left
          wd-padded-bottom-right
          wd-border-fat wd-border-blue wd-border-solid
          wd-bg-color-yellow
          mb-3
          "
      >
        Fat blue border with yellow background & margins on both sides
      </div>
      <div
        className="
          wd-margin-all-around
          wd-padding-fat
          wd-border-fat wd-border-yellow
          wd-border-solid
          wd-bg-color-blue
          wd-fg-color-white
        "
      >
        Fat yellow border with blue background & big margins all around
      </div>

      {/* 8. Corners */}
      <h3>Rounded Corners</h3>
      <div
        className="
          wd-rounded-corners-top
          wd-border-thin wd-border-blue wd-border-solid wd-padding-fat
          mb-3
        "
      >
        Rounded corners at top left & right
      </div>
      <div
        className="
          wd-rounded-corners-bottom
          wd-border-thin wd-border-blue wd-border-solid wd-padding-fat
          mb-3
        "
      >
        Rounded corners at bottom left & right
      </div>
      <div
        className="
          wd-rounded-corners-all-around
          wd-border-thin wd-border-blue wd-border-solid wd-padding-fat
          mb-3
        "
      >
        Rounded corners all around
      </div>
      <div
        className="
          wd-rounded-corners-inline
          wd-border-thin wd-border-blue wd-border-solid wd-padding-fat
          mb-3
        "
      >
        Different corners (except top-right)
      </div>

      {/* 9. Dimensions */}
      <h3>Dimensions</h3>
      <div className="wd-dimension-portrait wd-bg-color-yellow">
      Portrait
    </div>
    <div className="wd-dimension-landscape wd-bg-color-blue
                    wd-fg-color-white">
      Landscape
    </div>
    <div className="wd-dimension-square wd-bg-color-red">
      Square</div>


      {/* 10. Position Relative */}
      <h3>Relative Position</h3>
      <div className="wd-bg-color-gray">
    <div className="wd-bg-color-yellow 
                    wd-dimension-portrait">
      <div className="wd-pos-relative-nudge-down-right">
        Portrait</div></div>
    <div className="wd-pos-relative-nudge-up-right 
        wd-bg-color-blue wd-fg-color-white 
        wd-dimension-landscape">
      Landscape</div>
    <div className="wd-bg-color-red wd-dimension-square">
      Square</div>
  </div>

      {/* 11. Absolute Position */}
      <h3>Absolute Position</h3>
      <div className="wd-pos-relative mb-5" style={{ height: "200px", border: "1px solid #ccc" }}>
        <div className="wd-pos-absolute-10-10 wd-bg-color-yellow wd-dimension-portrait">
          Portrait
        </div>
        <div className="wd-pos-absolute-50-50 wd-bg-color-blue wd-fg-color-white wd-dimension-landscape">
          Landscape
        </div>
        <div className="wd-pos-absolute-120-20 wd-bg-color-red wd-dimension-square">
          Square
        </div>
      </div>

      {/* 12. Fixed Position */}
      <h3>Fixed Position</h3>
      <p>
        Checkout the blue square that says "Fixed position" stuck all the way on the right and half way down the page. It doesn't scroll with the rest of the page. Its position is "Fixed".
      </p>
      <div className="wd-pos-fixed wd-bg-color-blue wd-fg-color-white wd-dimension-square">
        Fixed position
      </div>

      {/* 13. Z-Index */}
      <h3>Z-Index</h3>
      <div className="wd-pos-relative mb-5" style={{ height: "200px", border: "1px solid #ccc" }}>
        <div className="wd-pos-absolute-10-10 wd-bg-color-yellow wd-dimension-portrait">
          Portrait
        </div>
        <div className="wd-zindex-bring-to-front wd-pos-absolute-50-50 wd-dimension-landscape wd-bg-color-blue wd-fg-color-white">
          Landscape
        </div>
        <div className="wd-pos-absolute-120-20 wd-bg-color-red wd-dimension-square">
          Square
        </div>
      </div>

      {/* 14. Floating */}
      <h3>Float</h3>
      <div>
   <img className="wd-float-right"
     src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"/>
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   <img className="wd-float-left"
     src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"/>
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   <img className="wd-float-right"
     src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"/>
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   <img className="wd-float-left"
     src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"/>
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ...
   <div className="wd-float-done"></div>
 </div>
 <br />
      <div>
   <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
     Yellow </div>
   <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
     Blue </div>
   <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
     Red </div>
   <img className="wd-float-right"
     src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"/>
   <div className="wd-float-done"></div>
 </div>

      {/* 15. Grid Layout */}
      <h3>Grid Layout</h3>
      <div className="wd-grid-row">
        <div className="wd-grid-col-half-page wd-bg-color-yellow text-center">
          <h4>Left half</h4>
        </div>
        <div className="wd-grid-col-half-page wd-bg-color-blue wd-fg-color-white text-center">
          <h4>Right half</h4>
        </div>
      </div>
      <div className="wd-grid-row">
        <div className="wd-grid-col-third-page wd-bg-color-green wd-fg-color-white text-center">
          <h4>Left third</h4>
        </div>
        <div className="wd-grid-col-two-thirds-page wd-bg-color-red wd-fg-color-white text-center">
          <h4>Right two-thirds</h4>
        </div>
      </div>

      <div className="wd-grid-row">
        <div className="wd-grid-col-left-sidebar wd-bg-color-yellow text-center">
          <h4>Side bar</h4>
      <p>This is the left sidebar</p>
        </div>
        <div className="wd-grid-col-main-content wd-bg-color-blue wd-fg-color-white text-center">
         <h4>Main content</h4>
      <p>
        This is the main content. This is the main content. This is the
        main content.
      </p>
        </div>
        <div className="wd-grid-col-right-sidebar wd-bg-color-green wd-fg-color-white text-center">
          <h4>Side bar</h4>
      <p>This is the right sidebar</p>
        </div>
      </div>

      {/* 16. Flex */}
      <h3>Flex</h3>
      <div className="wd-flex-row-container mb-3">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red">Column 3</div>
      </div>

      <div className="wd-flex-row-container mb-3">
        <div className="wd-bg-color-yellow wd-width-75px">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red wd-flex-grow-1">
          Column 3
        </div>
      </div>

      {/* 17. React Icons sample */}
      <h3>React Icons Sample</h3>
      <div className="d-flex mb-4">
        <VscAccount className="fs-3 me-3" />
        <AiOutlineDashboard className="fs-3 me-3" />
        <FaBookBible className="fs-3 me-3" />
        <FaCalendar className="fs-3 me-3" />
        <FaEnvelopeOpenText className="fs-3 me-3" />
        <FaRegClock className="fs-3" />
      </div>

      {/* 18. React Bootstrap grids */}
      <h3>Bootstrap Containers & Grid</h3>
      <Row>
        <Col className="bg-danger text-white">
          Left half
        </Col>
        <Col className="bg-primary text-white">
          Right half
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="bg-warning">
          One third
        </Col>
        <Col xs={8} className="bg-success text-white">
          Two thirds
        </Col>
      </Row>
      <Row>
        <Col xs={2} className="bg-black text-white">
          Sidebar
        </Col>
        <Col xs={8} className="bg-secondary text-white">
          Main Content
        </Col>
        <Col xs={2} className="bg-info">
          Sidebar
        </Col>
      </Row>

      <h4>Responsive Grid</h4>
      <Row>
        <Col xs={12} md={6} xl={3} className="bg-warning">
          Column A
        </Col>
        <Col xs={12} md={6} xl={3} className="bg-primary text-white">
          Column B
        </Col>
        <Col xs={12} md={6} xl={3} className="bg-danger text-white">
          Column C
        </Col>
        <Col xs={12} md={6} xl={3} className="bg-success text-white">
          Column D
        </Col>
      </Row>

      <h4>Even More Responsive Examples</h4>
      <Row>
        {[...Array(12).keys()].map((n) => (
          <Col
            key={n}
            xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}
            className={
              n % 2 === 0
                ? "bg-warning text-center"
                : "bg-primary text-white text-center"
            }
          >
            <h5>{n + 1}</h5>
          </Col>
        ))}
      </Row>

      {/* 19. Show/hide content at different breakpoints */}
      <h4>Screen Size Label (top-left fixed)</h4>
      <div id="wd-screen-size-label" className="text-center">
        <div className="d-block d-sm-none">XS (&lt;576px)</div>
        <div className="d-none d-sm-block d-md-none">SM (≥576px)</div>
        <div className="d-none d-md-block d-lg-none">MD (≥768px)</div>
        <div className="d-none d-lg-block d-xl-none">LG (≥992px)</div>
        <div className="d-none d-xl-block d-xxl-none">XL (≥1200px)</div>
        <div className="d-none d-xxl-block">XXL (≥1400px)</div>
      </div>

      {/* 20. Bootstrap Tables */}
      <h3>Bootstrap Tables</h3>
      <Table>
        <thead>
          <tr className="table-dark">
            <th>Quiz</th>
            <th>Topic</th>
            <th>Date</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-warning">
            <td>Q1</td>
            <td>HTML</td>
            <td>2/3/21</td>
            <td>85</td>
          </tr>
          <tr className="table-danger">
            <td>Q2</td>
            <td>CSS</td>
            <td>2/10/21</td>
            <td>90</td>
          </tr>
          <tr className="table-primary">
            <td>Q3</td>
            <td>JavaScript</td>
            <td>2/17/21</td>
            <td>90</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="table-success">
            <td colSpan={3}>Average</td>
            <td>88.3</td>
          </tr>
        </tfoot>
      </Table>

      <h3>Responsive Table</h3>
      <Table responsive>
        <thead>
          <tr>
            <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
            <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
            <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
            <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
            <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
          </tr>
        </tbody>
      </Table>

      {/* 21. Bootstrap Lists */}
      <h3>Favorite Movies</h3>
      <ListGroup>
        <ListGroup.Item active>Aliens</ListGroup.Item>
        <ListGroup.Item>Terminator</ListGroup.Item>
        <ListGroup.Item>Blade Runner</ListGroup.Item>
        <ListGroup.Item>Lord of the Rings</ListGroup.Item>
        <ListGroup.Item disabled>Star Wars</ListGroup.Item>
      </ListGroup>

      <h3>Favorite Books (hyperlink list)</h3>
      <ListGroup>
        <ListGroup.Item action active href="https://en.wikipedia.org/wiki/Dune_(novel)">
          Dune
        </ListGroup.Item>
        <ListGroup.Item action href="https://en.wikipedia.org/wiki/The_Lord_of_the_Rings">
          The Lord of the Rings
        </ListGroup.Item>
        <ListGroup.Item action href="https://en.wikipedia.org/wiki/The_Forever_War">
          The Forever War
        </ListGroup.Item>
        <ListGroup.Item action href="https://en.wikipedia.org/wiki/2001:_A_Space_Odyssey_(novel)">
          2001: A Space Odyssey
        </ListGroup.Item>
        <ListGroup.Item action disabled href="https://en.wikipedia.org/wiki/Ender%27s_Game">
          Ender's Game
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => alert("New book added!")}>
          Add another book
        </ListGroup.Item>
      </ListGroup>

      {/* 22. Bootstrap Forms */}
      <h3>Forms</h3>
      <FormGroup className="mb-3" controlId="wd-email">
        <FormLabel>Email address</FormLabel>
        <FormControl type="email" placeholder="name@example.com" />
      </FormGroup>
      <FormGroup className="mb-3" controlId="wd-textarea">
        <FormLabel>Example textarea</FormLabel>
        <FormControl as="textarea" rows={3} />
      </FormGroup>
      <h4>Dropdown</h4>
      <FormSelect className="mb-3">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </FormSelect>
      <h4>Switches</h4>
      <Form.Check type="switch" checked={false} id="wd-switch-1"
              label="Unchecked switch checkbox input"/>
  <Form.Check type="switch" checked={true}  id="wd-switch-2"
              label="Checked switch checkbox input"/>
  <Form.Check type="switch" checked={false} disabled
              id="custom-switch"
              label="Unchecked disabled switch checkbox input"/>
  <Form.Check type="switch" checked={true} disabled 
              id="custom-switch"
              label="Checked disabled switch checkbox input"/>

      <h4>Range</h4>
      <FormGroup controlId="wd-range1">
        <FormLabel>Example range</FormLabel>
        <Form.Range min="0" max="5" step="1" />
      </FormGroup>

      <h4>Addons</h4>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
        <FormControl />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
      </InputGroup>

      <h4>Responsive Forms</h4>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="email1">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" value="email@example.com" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="password1">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="bio">
          <Form.Label column sm={2}>
            Bio
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" style={{ height: "100px" }} />
          </Col>
        </Form.Group>
      </Form>

      <h4>Another Example</h4>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Radios
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="first radio"
                name="formHorizontalRadios"
                defaultChecked
              />
              <Form.Check
                type="radio"
                label="second radio"
                name="formHorizontalRadios"
              />
              <Form.Check
                type="radio"
                label="third radio"
                name="formHorizontalRadios"
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form.Group>
      </Form>

      {/* 23. Navigation Tabs */}
      <h3>Navigation Tabs</h3>
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Active" active>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Link1">Link 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Link2">Link 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 24. Use Pills for your own TOC, or done above. */}
      <h3>Navigation with Pills (already done above for TOC)</h3>

      {/* 25. Cards */}
      <h3>Cards Example</h3>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="/images/stacked.jpg" />
        <Card.Body>
          <Card.Title>Stacking Starship</Card.Title>
          <Card.Text>
            Stacking the most powerful rocket in history. Mars or bust!
          </Card.Text>
          <Button variant="primary">Boldly Go</Button>
        </Card.Body>
      </Card>

      <br />
      <br />
    </Container>
  );
}
