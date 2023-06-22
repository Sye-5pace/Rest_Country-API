  function range(start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }
  
  function getPageList(totalPages, page, maxLength) {
    const sideWidth = maxLength < 9 ? 1 : 2;
    const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    const rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  
    if (totalPages <= maxLength) {
      return range(1, totalPages);
    }
  
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
      return range(1, maxLength - sideWidth - 1 - rightWidth - 1)
        .concat(0, range(totalPages - sideWidth + 1, totalPages));
    }
  
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
      return range(1, sideWidth)
        .concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }
  
    return range(1, sideWidth - 1)
      .concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1));
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const numberOfItems = document.querySelectorAll(".card-content .card").length;
    const limitPerPage = 3;
    const totalPages = Math.ceil(numberOfItems / limitPerPage);
    const paginationSize = 7;
    let currentPage;
  
    function showPage(whichPage) {
  
      /* */
  
      const pagination = document.querySelector('.pagination');
      const paginationItems = pagination.querySelectorAll('li');
      paginationItems.forEach(function(item, index) {
        if (index > 0 && index < paginationItems.length - 1) {
          item.remove();
        }
      });
  
      getPageList(totalPages, currentPage, paginationSize).forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        li.classList.add(item ? "current-page" : "dots");
  
        a.textContent = item || "...";
  
        pagination.insertBefore(li, pagination.querySelector('.next-page'));
        if (item === currentPage) {
          li.classList.add("active");
        }
      });
  
      const previousPage = document.querySelector('.previous-page');
      const nextPage = document.querySelector('.next-page');
  
      if (currentPage === 1) {
        previousPage.classList.add('disable');
      } else {
        previousPage.classList.remove('disable');
      }
  
      if (currentPage === totalPages) {
        nextPage.classList.add('disable');
      } else {
        nextPage.classList.remove('disable');
      }
  
      return true;
    }
  
    const pagination = document.querySelector('.pagination');
  
    const previousPage = document.createElement('li');
    previousPage.classList.add('page-item');
    previousPage.classList.add('previous-page');
  
    const previousLink = document.createElement('a');
    previousLink.classList.add('page-link');
    previousLink.href = 'javascript:void(0)';
    previousLink.textContent = 'Prev';
  
    previousPage.appendChild(previousLink);
    pagination.appendChild(previousPage);
  
    const nextPage = document.createElement('li');
    nextPage.classList.add('page-item');
    nextPage.classList.add('next-page');
  
    const nextLink = document.createElement('a');
    nextLink.classList.add('page-link');
    nextLink.href = 'javascript:void(0)';
    nextLink.textContent = 'Next';
  
    nextPage.appendChild(nextLink);
    pagination.appendChild(nextPage);
  
    const cardContent = document.querySelector('.card-content');
    cardContent.style.display = "block";
  
    showPage(1);
  
    pagination.addEventListener('click', function(event) {
      const target = event.target;
      if (target.tagName === 'A' && !target.parentElement.classList.contains('active')) {
        const pageNumber = parseInt(target.textContent);
        showPage(pageNumber);
      }
    });
  
    nextPage.addEventListener('click', function() {
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    });
  
    previousPage.addEventListener('click', function() {
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });
  });
  