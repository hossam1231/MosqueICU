export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// const action = async () => {
//   for (let i = 1; i < 5; i++) {
//     console.log(`Round ${i}`);
//     console.log("Waiting for 500ms");
//     await sleep(500);
//     console.log("Posting");
//   }
// };
