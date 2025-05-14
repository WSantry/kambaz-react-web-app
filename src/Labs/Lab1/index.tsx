export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1 - HTML Exercises</h2>

      {/* HEADINGS */}
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        <h1>H1 Example</h1>
        <h2>H2 Example</h2>
        <h3>H3 Example</h3>
        <h4>H4 Example</h4>
        <h5>H5 Example</h5>
        <h6>H6 Example</h6>
      </div>

      {/* PARAGRAPHS */}
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-2">
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default
          browsers render them as one contiguous piece of text.
        </p>
        <p id="wd-p-3">
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers to render the gaps.
        </p>
      </div>

      {/* LISTS */}
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag (Pancakes)</h5>
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>

        <h5>My favorite recipe</h5>
        <ol id="wd-your-favorite-recipe">
          <li>Gather ingredients</li>
          <li>Mix them thoroughly</li>
          <li>Bake at 350 degrees for 30 min</li>
        </ol>

        <h5>Unordered List Tag</h5>
        <p>My favorite books (in no particular order):</p>
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender's Game</li>
          <li>Red Mars</li>
          <li>The Forever War</li>
        </ul>

        <p>Your favorite books (in no particular order):</p>
        <ul id="wd-your-books">
          <li>A Tale of Two Cities</li>
          <li>Foundation</li>
          <li>Neuromancer</li>
        </ul>
      </div>

      {/* TABLE */}
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2025-02-03</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2025-02-10</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>JavaScript</td>
              <td>2025-02-17</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>React</td>
              <td>2025-02-24</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Q5</td>
              <td>Node.js</td>
              <td>2025-03-03</td>
              <td>92</td>
            </tr>
            <tr>
              <td>Q6</td>
              <td>Express</td>
              <td>2025-03-10</td>
              <td>88</td>
            </tr>
            <tr>
              <td>Q7</td>
              <td>MongoDB</td>
              <td>2025-03-17</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Q8</td>
              <td>Bootstrap</td>
              <td>2025-03-24</td>
              <td>86</td>
            </tr>
            <tr>
              <td>Q9</td>
              <td>Redux</td>
              <td>2025-03-31</td>
              <td>89</td>
            </tr>
            <tr>
              <td>Q10</td>
              <td>Testing</td>
              <td>2025-04-07</td>
              <td>94</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>91</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* IMAGES */}
      <div id="wd-images">
        <h4>Image tag</h4>
        Loading an image from the internet: <br />
        <img
          id="wd-starship"
          width="400px"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <br />
        Loading a local image:
        <br />
        <img
          id="wd-teslabot"
          src="/images/teslabot.jpg"
          height="200px"
          alt="Teslabot"
        />
      </div>

      {/* FORMS */}
      <div id="wd-forms">
        <h4>Form Elements</h4>
        <form id="wd-text-fields">
          <h5>Text Fields</h5>
          <label htmlFor="wd-text-fields-username">Username:</label>
          <input placeholder="jdoe" id="wd-text-fields-username" /> <br />

          <label htmlFor="wd-text-fields-password">Password:</label>
          <input
            type="password"
            defaultValue="123@#$asd"
            id="wd-text-fields-password"
          />
          <br />

          <label htmlFor="wd-text-fields-first-name">First name:</label>
          <input type="text" title="John" id="wd-text-fields-first-name" /> <br />

          <label htmlFor="wd-text-fields-last-name">Last name:</label>
          <input
            type="text"
            placeholder="Doe"
            defaultValue="Wonderland"
            title="The last name"
            id="wd-text-fields-last-name"
          />
          <br />

          <h5>Text boxes</h5>
          <label htmlFor="wd-textarea">Biography:</label>
          <br />
          <textarea id="wd-textarea" cols={30} rows={5}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          </textarea>
          <br />

          <h5 id="wd-buttons">Buttons</h5>
          <button
            type="button"
            onClick={() => alert("Life is Good!")}
            id="wd-all-good"
          >
            Hello World!
          </button>
          <br />

          <h5>File upload</h5>
          <input type="file" id="wd-file-upload-btn" />

          <h5 id="wd-radio-buttons">Radio buttons</h5>
          <label>Favorite movie genre:</label>
          <br />
          <input type="radio" name="radio-genre" id="wd-radio-comedy" />
          <label htmlFor="wd-radio-comedy">Comedy</label>
          <br />
          <input type="radio" name="radio-genre" id="wd-radio-drama" />
          <label htmlFor="wd-radio-drama">Drama</label>
          <br />
          <input type="radio" name="radio-genre" id="wd-radio-scifi" />
          <label htmlFor="wd-radio-scifi">Science Fiction</label>
          <br />
          <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
          <label htmlFor="wd-radio-fantasy">Fantasy</label>
          <br />

          <h5 id="wd-checkboxes">Checkboxes</h5>
          <label>Favorite movie genre:</label>
          <br />
          <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
          <label htmlFor="wd-chkbox-comedy">Comedy</label>
          <br />
          <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
          <label htmlFor="wd-chkbox-drama">Drama</label>
          <br />
          <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
          <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
          <br />
          <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
          <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
          <br />

          <h4 id="wd-dropdowns">Dropdowns</h4>
          <h5>Select one</h5>
          <label htmlFor="wd-select-one-genre">Favorite movie genre:</label>
          <br />
          <select id="wd-select-one-genre">
            <option value="COMEDY">Comedy</option>
            <option value="DRAMA">Drama</option>
            <option value="SCIFI">Science Fiction</option>
            <option value="FANTASY">Fantasy</option>
          </select>
          <br />

          <h5>Select many</h5>
          <label htmlFor="wd-select-many-genre">Favorite movie genres:</label>
          <br />
          <select multiple id="wd-select-many-genre">
            <option value="COMEDY">Comedy</option>
            <option value="DRAMA">Drama</option>
            <option value="SCIFI">Science Fiction</option>
            <option value="FANTASY">Fantasy</option>
          </select>
          <br />

          <h4>Other HTML field types</h4>
          <label htmlFor="wd-text-fields-email">Email:</label>
          <input
            type="email"
            placeholder="jdoe@somewhere.com"
            id="wd-text-fields-email"
          />
          <br />

          <label htmlFor="wd-text-fields-salary-start">Starting salary:</label>
          <input
            type="number"
            defaultValue="100000"
            placeholder="1000"
            id="wd-text-fields-salary-start"
          />
          <br />

          <label htmlFor="wd-text-fields-rating">Rating:</label>
          <input type="range" defaultValue="4" max="5" id="wd-text-fields-rating" />
          <br />

          <label htmlFor="wd-text-fields-dob">Date of birth:</label>
          <input type="date" defaultValue="2000-01-21" id="wd-text-fields-dob" />
          <br />
        </form>
      </div>

      {/* ANCHOR TAGS */}
      <div id="wd-anchor-tag">
        <h4>Anchor tag</h4>
        Please{" "}
        <a
          href="https://www.lipsum.com"
          id="wd-lipsum"
          target="_blank"
          rel="noreferrer"
        >
          click here
        </a>{" "}
        to get dummy text.
        <br />
        <a
          id="wd-github"
          href="https://github.com/WSantry/kambaz-react-web-app.git"
          target="_blank"
          rel="noreferrer"
        >
          My GitHub Repo
        </a>
      </div>
    </div>
  );
}
