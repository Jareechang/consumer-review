import sum from '../sum';

function slowApi() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('api response');
    }, 3000);
  })
}

test('it should add 2 + 3 correctly', async () => {
  const response = await slowApi();
  console.log(response);
  expect(sum(2 ,3)).toBe(5);
});
