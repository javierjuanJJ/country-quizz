export function getRandomCountries(data, count) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  export function generateQuizQuestions(selectedCountries, allCountries) {
    return selectedCountries.map(country => {
      const correctAnswer = country.capital?.[0] || "N/A";
  
      const wrongOptions = allCountries
        .filter(c => c.capital && c.capital[0] !== correctAnswer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(c => c.capital[0]);
  
      const options = [...wrongOptions, correctAnswer].sort(() => 0.5 - Math.random());
  
      return {
        question: `¿Cuál es la capital de ${country.name.common}?`,
        options,
        correctAnswer,
        flag: country.flags.png,
      };
    });
  }