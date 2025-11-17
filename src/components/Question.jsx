useEffect(() => {
    async function loadQuiz() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
  
      // Seleccionar 10 países aleatorios
      const selectedCountries = getRandomItems(data, 10);
  
      // Generar preguntas
      const quizQuestions = generateQuizQuestions(selectedCountries, data);
  
      setQuestions(quizQuestions);
    }
  
    loadQuiz();
  }, []);
  

// Función para mezclar un array (Fisher–Yates shuffle)
function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }
  
  // Selecciona elementos aleatorios
  function getRandomItems(arr, num) {
    const shuffled = shuffleArray(arr);
    return shuffled.slice(0, num);
  }
  
  // Genera las 10 preguntas del quiz
  function generateQuizQuestions(selectedCountries, allCountries) {
    return selectedCountries.map(country => {
      const correctAnswer = country.capital?.[0] || "No capital";
  
      // Obtener 3 países aleatorios distintos al correcto
      const wrongOptions = getRandomItems(
        allCountries.filter(c => c.cca3 !== country.cca3),
        3
      ).map(c => c.capital?.[0] || "No capital");
  
      // Combinar opciones
      const options = shuffleArray([correctAnswer, ...wrongOptions]);
  
      return {
        question: `¿Cuál es la capital de ${country.name.common}?`,
        correctAnswer,
        options
      };
    });
  }
  