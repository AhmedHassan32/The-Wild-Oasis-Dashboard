// I keep getting this message in my console.
// 3 upvotes
// Niv · Lecture 373 · 6 months ago
// styled-components: it looks like an unknown prop "columns" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)

// I think I understand why but anyways can you explain why is it happens and show how to fix it?

// 2 replies

// Prateek — Teaching Assistant
// 0 upvotes
// 6 months ago
// Hi,

// Your error looks very similar to this one. The below thread might help for your case :

// https://www.udemy.com/course/the-ultimate-react-course/learn/lecture/38038116#questions/20502134

// Eric
// 1 upvote
// 5 months ago
// const Comp = styled.div`
//   color: ${props =>
//     props.$draggable || 'black'};
// `;

// render(
//   <Comp $draggable="red" draggable="true">
//     Drag me!
//   </Comp>
// );
// Here is how Angela Yu would explain it, according to Bard:

// Hey Eric, Angela here to make props crystal clear! Imagine your styled component is a dressing room, and props are like accessories. Some accessories are meant to stay in the dressing room (like a styling comb), while others are meant to go out with you (like a cool hat). Transient props are like those "stay-in" accessories.

// Here's the breakdown:

// Styled components: These are like customizable mannequins that let you create unique looks for your HTML elements.

// Props: These are like accessories you give to the mannequin to change its appearance or behavior.

// Transient props ($ props): These are special props that stay in the dressing room. They only affect the styling of the component, not the underlying HTML element itself. 🪞

// Think of it like this:

// Transient props are like secret styling instructions that only the styled component understands.

// Regular props are like public announcements that everyone can see, including the browser.

// So, when to use transient props?

// When you want to style a component based on a prop, but you don't want that prop to affect the underlying HTML element.

// It's like putting on a fancy necklace for a fashion show, but leaving it in the dressing room when you go out. ✨

// Remember, Eric:

// Use transient props to keep your styling secrets under wraps.

// Use regular props to shout your component's features to the world!

// S
// Add reply
