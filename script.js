$(document).ready(function() {
  const loveMessages = [
      "Nosso amor transcende o universo",
      "Te amo além de todos os universos, minha lua",
      "Te amo além de todos os universos, meu sol"
  ];
  let currentMessage = 0;
  let currentSection = 'universe';
  let currentMemory = 0;

  const randomLoveMessages = [
      "Você é a estrela mais brilhante no meu céu.",
      "Nosso amor é mais forte que a gravidade.",
      "Com você, cada dia é uma nova aventura cósmica.",
      "Você ilumina minha vida como o sol ilumina a Terra.",
      "Nosso amor é infinito como o universo."
  ];

  const dateIdeas = [
      "Piquenique sob as estrelas",
      "Noite de cinema em casa com filmes de ficção científica",
      "Visita a um planetário",
      "Aula de dança a dois",
      "Cozinhar juntos uma refeição temática de espaço",
      "Passeio noturno para observar as estrelas",
      "Dia de spa em casa com máscaras faciais de 'lua cheia'",
      "Criar uma cápsula do tempo juntos",
      "Aula de pintura inspirada no espaço",
      "Fazer um tour virtual pela Estação Espacial Internacional"
  ];

  const playlist = [
      { title: "Fly Me to the Moon - Frank Sinatra", src: "fly-me-to-the-moon.mp3" },
      { title: "Space Oddity - David Bowie", src: "space-oddity.mp3" },
      { title: "Across the Universe - The Beatles", src: "across-the-universe.mp3" },
      { title: "Starman - David Bowie", src: "starman.mp3" },
      { title: "Rocket Man - Elton John", src: "rocket-man.mp3" }
  ];

  // Animação do texto principal
  function animateText() {
      $('#love-message').fadeOut(1000, function() {
          currentMessage = (currentMessage + 1) % loveMessages.length;
          $(this).text(loveMessages[currentMessage]).fadeIn(1000);
      });
  }
  
  setInterval(animateText, 5000);

  // Efeito de brilho ao passar o mouse sobre os corpos celestes
  $('#sun, #moon').hover(
      function() {
          $(this).css('transform', 'scale(1.1)');
      },
      function() {
          $(this).css('transform', 'scale(1)');
      }
  );

  // Função para mudar de seção
  function changeSection(newSection) {
      $('.section').removeClass('visible').addClass('hidden');
      $(`#${newSection}`).removeClass('hidden').addClass('visible');
      currentSection = newSection;

      // Atualiza o texto do botão
      if (newSection === 'universe') {
          $('#special-message').text('Explorar Nosso Universo');
      } else {
          $('#special-message').text('Próxima Seção');
      }
  }

  // Botão de explorar o universo
  $('#special-message').click(function() {
      const sections = ['photo-section', 'countdown', 'love-generator', 'memory-gallery', 'poem', 'constellation', 'find-star-game', 'romantic-dates', 'message-board', 'our-future', 'virtual-garden', 'music-album', 'universe'];
      let nextSection = sections[(sections.indexOf(currentSection) + 1) % sections.length];
      changeSection(nextSection);

      if (nextSection === 'constellation') {
          drawConstellation();
      } else if (nextSection === 'countdown') {
          updateCountdown();
      } else if (nextSection === 'love-generator') {
          $('#generate-message').click();
      } else if (nextSection === 'find-star-game') {
          startFindStarGame();
      } else if (nextSection === 'virtual-garden') {
          updateGarden();
      } else if (nextSection === 'music-album') {
          loadPlaylist();
      }
  });

  // Contador regressivo
  function updateCountdown() {
      const nextDate = new Date($('#date-input').val()).getTime();
      const now = new Date().getTime();
      const distance = nextDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      $('#countdown-timer').text(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
          $('#countdown-timer').text("É hoje!");
      }
  }

  $('#date-input').change(updateCountdown);
  setInterval(updateCountdown, 1000);

  // Gerador de mensagens de amor
  $('#generate-message').click(function() {
      const randomIndex = Math.floor(Math.random() * randomLoveMessages.length);
      $('#random-love-message').text(randomLoveMessages[randomIndex]);
  });

  // Galeria de memórias
  function showMemory(index) {
      $('#carousel img').removeClass('active');
      $(`#carousel img:eq(${index})`).addClass('active');
  }

  $('#prev-memory').click(function() {
      currentMemory = (currentMemory - 1 + $('#carousel img').length) % $('#carousel img').length;
      showMemory(currentMemory);
  });

  $('#next-memory').click(function() {
      currentMemory = (currentMemory + 1) % $('#carousel img').length;
      showMemory(currentMemory);
  });

  showMemory(currentMemory);

  // Música de fundo
  $('#toggle-music').removeClass('hidden').click(function() {
      const music = $('#background-music')[0];
      if (music.paused) {
          music.play();
          $(this).text('Pausar Música');
      } else {
          music.pause();
          $(this).text('Tocar Música');
      }
  });

  // Adiciona estrelas cadentes aleatórias
  function addShootingStar() {
      var star = $('<div class="shooting-star"></div>');
      var startX = Math.random() * window.innerWidth;
      var startY = Math.random() * window.innerHeight / 2;
      var endX = startX + Math.random() * 300 + 100;
      var endY = startY + Math.random() * 300 + 100;

      star.css({
          'left': startX + 'px',
          'top': startY + 'px'
      });

      $('#universe').append(star);

      star.animate({
          left: endX,
          top: endY,
          opacity: 0
      }, 1000, function() {
          $(this).remove();
      });
  }

  setInterval(addShootingStar, 2000);

  // Desenha a constelação do amor
  function drawConstellation() {
      const svg = $('#constellation svg');
      svg.empty();

      const points = [
          {x: 150, y: 50},
          {x: 50, y: 150},
          {x: 250, y: 150},
          {x: 100, y: 250},
          {x: 200, y: 250}
      ];

      for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
              svg.append($('<line>', {
                  x1: points[i].x,
                  y1: points[i].y,
                  x2: points[j].x,
                  y2: points[j].y,
                  stroke: 'white',
                  'stroke-width': 1
              }));
          }
      }

      points.forEach((point, index) => {
          svg.append($('<circle>', {
              cx: point.x,
              cy: point.y,
              r: 3,
              fill: 'white'
          }));

          const texts = ["Amor", "Confiança", "Respeito", "Carinho", "Cumplicidade"];
          svg.append($('<text>', {
              x: point.x,
              y: point.y + 15,
              fill: 'white',
              'text-anchor': 'middle',
              'font-size': '12px'
          }).text(texts[index]));
      });
  }

  // Mini-jogo: Encontre a Estrela
  function startFindStarGame() {
      const gameArea = $('#find-star-game');
      gameArea.empty();
      
      const starCount = 50;
      const specialStar = Math.floor(Math.random() * starCount);
      
      for (let i = 0; i < starCount; i++) {
          const star = $('<div class="game-star"></div>');
          star.css({
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
          });
          
          if (i === specialStar) {
              star.addClass('special-star');
              star.click(function() {
                  alert('Parabéns! Você encontrou a estrela especial do nosso amor!');
                  startFindStarGame();
              });
          } else {
              star.click(function() {
                  $(this).fadeOut(200);
              });
          }
          
          gameArea.append(star);
      }
  }

  // Gerador de Encontros Românticos
  $('#generate-date').click(function() {
      const randomIndex = Math.floor(Math.random() * dateIdeas.length);
      $('#date-idea').text(dateIdeas[randomIndex]);
  });

  // Mural de Mensagens
  const messagePassword = "18/07/2022"; // Defina uma senha aqui
  $('#unlock-messages').click(function() {
      if ($('#message-password').val() === messagePassword) {
          $('#messages-container, #new-message, #send-message').removeClass('hidden');
          loadMessages();
      } else {
          alert("Senha incorreta!");
      }
  });

  $('#send-message').click(function() {
      const message = $('#new-message').val();
      if (message) {
          const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
          messages.push(message);
          localStorage.setItem('loveMessages', JSON.stringify(messages));
          $('#new-message').val('');
          loadMessages();
      }
  });

  function loadMessages() {
      const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
      $('#messages-container').html(messages.map(msg => `<p>${msg}</p>`).join(''));
  }

  // Nosso Futuro
  $('#save-goals').click(function() {
      const goals = $('#future-goals').val();
      localStorage.setItem('futureGoals', goals);
      updateGoals();
  });

  function updateGoals() {
      const goals = localStorage.getItem('futureGoals') || '';
      $('#saved-goals').text(goals);
      $('#future-goals').val(goals);
  }

  // Jardim Virtual
  function updateGarden() {
      const visits = parseInt(localStorage.getItem('visits') || '0') + 1;
      localStorage.setItem('visits', visits);

      const plantsContainer = $('#plants-container');
      plantsContainer.empty();

      const plantStages = ['🌱', '🌿', '🌳'];
      const plantCount = Math.min(Math.floor(visits / 5), 5);

      for (let i = 0; i < plantCount; i++) {
          const stage = Math.min(Math.floor(visits / 10), 2);
          plantsContainer.append(`<div class="plant">${plantStages[stage]}</div>`);
      }
  }

  // Álbum de Músicas
  function loadPlaylist() {
      const playlistElement = $('#playlist');
      playlistElement.empty();

      playlist.forEach((song, index) => {
          playlistElement.append(`<li data-src="${song.src}">${song.title}</li>`);
      });

      $('#playlist li').click(function() {
          const src = $(this).data('src');
          const audioPlayer = $('#audio-player')[0];
          audioPlayer.src = src;
          audioPlayer.play();
      });
  }

  // Inicializa a primeira seção
  changeSection('universe');
  updateGoals();
});

