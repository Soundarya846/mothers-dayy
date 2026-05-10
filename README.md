# Happy Mummyy Divass 🌸

A beautiful, fully interactive, and customizable Mother's Day website built with love, HTML, CSS, and Vanilla JavaScript. 

## ✨ Features
- **Romantic Aesthetics:** Soft blush pinks, rose red, and cream white.
- **Floating Petals:** Gentle petal animations looping in the background.
- **Multiple Pages:** A beautiful journey spread across 5 separate pages linked together.
- **Interactive Photo Gallery:** Polaroid-style frames where you can upload personal photos with a click.
- **Love Timeline:** A beautiful zigzag timeline to document your journey and memories (supports images and videos).
- **Interactive Gift Box:** A 3D-styled gift box that pops open on click with a beautiful burst of floating hearts.
- **Customizable Love Letter:** A beautiful envelope that reveals a styled love letter when clicked. **The letter text is fully editable right on the page!**

---

## 📁 Where to Save and How to Edit

### 1. Where it is Saved
The website is now split into multiple files for a guided page-by-page experience. You can find them in your project folder: 
`C:\Users\Soundarya\.antigravity\mothers day\`

To start the experience, just double-click the `index.html` file, and it will open in your default web browser. You can navigate through the pages using the "Next" buttons at the bottom of each page.

### 2. How to Edit the Content

#### Editing the Letter
You have two options to edit the love letter:
1. **Directly on the webpage (Easiest):** Open `letter.html` in your browser, click the envelope to open the letter, and simply click on the text. The letter is `contenteditable`, meaning you can type and change the paragraphs straight from your browser just like a Word document! *(Note: If you refresh the page, changes will reset unless you save the HTML. We recommend taking a screenshot after editing it on the web, or editing the HTML file if you want it saved permanently).*
2. **In the Code:** 
   - Open `letter.html` in any text editor (like Notepad, VS Code, or Sublime Text).
   - Find the `<div class="letter-content" id="editableLetter" contenteditable="true">`.
   - Replace the paragraphs (`<p>...</p>`) inside with your own personal message. Save the file.

#### Adding Photos to Gallery & Timeline
- You **do not** need to edit code to add photos! 
- Simply open the website in your browser, and click on the grey "Click to upload photo" areas in the polaroid cards or the "Add an image or video" areas in the timeline. 
- A file chooser will pop up, allowing you to select pictures or videos from your computer or phone. They will instantly appear in the frames.

---

## 📱 How to View on Mobile Phones (Accessibility)

Since this website uses multiple files now, Option B or C is highly recommended.

### Option A: Send the folder as a ZIP
You can zip the `mothers day` folder and send it to your phone, extract it, and open `index.html`.

### Option B: Host it Online for Free (Highly Recommended)
To get a proper link (like `https://yoursite.netlify.app`), you can host it online for free in 2 minutes:
1. Go to [Netlify Drop](https://app.netlify.com/drop) (no account needed).
2. Drag and drop the entire `mothers day` folder onto the page.
3. Netlify will instantly generate a live, public link that you can open on your phone or send to your mom.

### Option C: Local Server (Advanced)
If you just want to preview it on your phone while connected to the same Wi-Fi network:
1. Open Command Prompt on your Windows PC and navigate to your folder:
   ```cmd
   cd "C:\Users\Soundarya\.antigravity\mothers day"
   ```
2. Run a simple Python server:
   ```cmd
   python -m http.server 8000
   ```
3. Find your PC's IP address (run `ipconfig` in another command prompt and look for `IPv4 Address`, e.g., `192.168.1.5`).
4. On your mobile phone (connected to the same Wi-Fi), open your browser and go to: `http://192.168.1.5:8000`.

Enjoy celebrating Mother's Day! 🌸💗
