const fetchData = async (url) => {
  let resposnse = await fetch(url);
  let data = await resposnse.json();
  return data;
};
export default fetchData;
