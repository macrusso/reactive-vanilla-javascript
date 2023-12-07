(function () {
  const ASC = "asc";
  const DESC = "desc";
  const VALID_HEADERS = ["name", "email", "date", "city", "country"];

  const fetchData = async ({ orderType, orderBy }) => {
    const data = (
      await fetch(
        `http://localhost:4000/api/users?orderBy=${orderBy}&orderType=${orderType}`
      )
    ).json();

    return data;
  };

  const App = ({ template, props, selector }) => {
    let state = {
      orderBy: "name",
      orderType: ASC,
      items: [],
    };

    const setState = (newState) => {
      state = { ...state, ...newState };
      render();
    };

    const element = document.querySelector(selector);

    element.addEventListener("click", async (e) => {
      if (VALID_HEADERS.includes(e.target.id)) {
        const orderBy = state.orderBy === e.target.id
          ? state.orderBy
          : e.target.id;

        const orderType = state.orderBy === e.target.id
          ? state.orderType === ASC
            ? DESC
            : ASC
          : ASC;


        setState({
          orderType,
          orderBy,
        });

        await loadItems();
      }
    });

    const loadItems = async () => {
      try {
        const items = await fetchData({
          orderBy: state.orderBy,
          orderType: state.orderType,
        });

        setState({
          items,
        });
      } catch (error) {
        console.error("error", error);
      }
    };

    const render = () => {
      element.innerHTML = template({ state, props });
    };

    return {
      run() {
        render();
        loadItems();
      },
    };
  };

  const app = App({
    selector: "#app",
    props: {},
    template: ({ props, state }) => {
      return `
      <div class="table" role="table" aria-label="Users">
        <div class="header" role="rowgroup">
          <div class="cell first" role="columnheader" id="name">Full Name</div>
          <div class="cell second" role="columnheader" id="email">Email</div>
          <div class="cell" role="columnheader" id="date">Date</div>
          <div class="cell" role="columnheader" id="city">City</div>
          <div class="cell" role="columnheader" id="country">Country</div>
        </div>
              ${state.items.reduce((acc, item, index) => {
        const cur = `
        <div class="row" role="rowgroup" id="row-${index}">
          <div class="cell first" role="cell">${item.first_name} ${item.last_name}</div>
          <div class="cell second" role="cell">${item.email}</div>
          <div class="cell" role="cell">${item.date}</div>
          <div class="cell" role="cell">${item.city}</div>
          <div class="cell" role="cell">${item.country}</div>
        </div>`;
        return acc + cur;
      }, '')}
      </div>`;
    },
  });

  app.run();
})();
