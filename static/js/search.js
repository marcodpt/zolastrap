function closeSearch() {
  const main = document.querySelector('main')
  main.innerHTML = window.main
}

function goSearch(btn) {
  const term = btn
    .closest('form')
    .querySelector('input[type="text"]')
    .value.trim()
  const terms = term.split(" ")

  const main = document.querySelector('main')
  if (!window.main) {
    window.main = main.innerHTML
  }

  var index = elasticlunr.Index.load(window.searchIndex);
  var results = index.search(term, {
    bool: "AND",
    fields: {
      title: {
        boost: 2
      },
      body: {
        boost: 1
      },
    }
  });

  var info = '' 
  var data = ''
  if (results.length) {
    info = `Results for: ${term}`
    data = `
      <ul class="list-group">${results.map(function (item) {
        return `
          <li class="list-group-item">
            <a href="${item.ref}">${item.doc.title}</a>
            <div>${makeTeaser(item.doc.body, terms)}</div>
          </li>
        `
      }).join("")}</ul>
    `
  } else {
    info = `No results for: ${term}`
  }

  var html = `
    <h1>
      <button 
        class="btn btn-link"
        type="button"
        onclick="closeSearch()"
      >
        <i class="fas fa-times"></i>
      </button>
      ${info}
    </h1>
    ${data}
  `

  main.innerHTML = html
}

function makeTeaser(body, terms) {
  var TERM_WEIGHT = 40;
  var NORMAL_WORD_WEIGHT = 2;
  var FIRST_WORD_WEIGHT = 8;
  var TEASER_MAX_WORDS = 30;

  var stemmedTerms = terms.map(function (w) {
    return elasticlunr.stemmer(w.toLowerCase());
  });
  var termFound = false;
  var index = 0;
  var weighted = []; // contains elements of ["word", weight, index_in_document]

  // split in sentences, then words
  var sentences = body.toLowerCase().split(". ");

  for (var i in sentences) {
    var words = sentences[i].split(" ");
    var value = FIRST_WORD_WEIGHT;

    for (var j in words) {
      var word = words[j];

      if (word.length > 0) {
        for (var k in stemmedTerms) {
          if (elasticlunr.stemmer(word).startsWith(stemmedTerms[k])) {
            value = TERM_WEIGHT;
            termFound = true;
          }
        }
        weighted.push([word, value, index]);
        value = NORMAL_WORD_WEIGHT;
      }

      index += word.length;
      index += 1; // ' ' or '.' if last word in sentence
    }

    index += 1; // because we split at a two-char boundary '. '
  }

  if (weighted.length === 0) {
    return body;
  }

  var windowWeights = [];
  var windowSize = Math.min(weighted.length, TEASER_MAX_WORDS);
  // We add a window with all the weights first
  var curSum = 0;
  for (var i = 0; i < windowSize; i++) {
    curSum += weighted[i][1];
  }
  windowWeights.push(curSum);

  for (var i = 0; i < weighted.length - windowSize; i++) {
    curSum -= weighted[i][1];
    curSum += weighted[i + windowSize][1];
    windowWeights.push(curSum);
  }

  // If we didn't find the term, just pick the first window
  var maxSumIndex = 0;
  if (termFound) {
    var maxFound = 0;
    // backwards
    for (var i = windowWeights.length - 1; i >= 0; i--) {
      if (windowWeights[i] > maxFound) {
        maxFound = windowWeights[i];
        maxSumIndex = i;
      }
    }
  }

  var teaser = [];
  var startIndex = weighted[maxSumIndex][2];
  for (var i = maxSumIndex; i < maxSumIndex + windowSize; i++) {
    var word = weighted[i];
    if (startIndex < word[2]) {
      // missing text from index to start of `word`
      teaser.push(body.substring(startIndex, word[2]));
      startIndex = word[2];
    }

    // add <em/> around search terms
    if (word[1] === TERM_WEIGHT) {
      teaser.push("<b>");
    }
    startIndex = word[2] + word[0].length;
    teaser.push(body.substring(word[2], startIndex));

    if (word[1] === TERM_WEIGHT) {
      teaser.push("</b>");
    }
  }
  teaser.push("…");
  return teaser.join("");
}
