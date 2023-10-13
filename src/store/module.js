import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
/*
  zustand로 전역 state관리
  hook 형식으로 사용. 
  사용페이지는 src\pages\SettingAccess.js Line 14 참고.
  state값의 경우 /settingAceess 의 주소에서 redux-Devtool 크롬 확장프로그램 사용하면 기존 redux 사용 state와 함께 보임.
  zustand의경우 state값을 항상 set 함수로 불변성을 지켜야함.
  아래 useTabState로 설명:
  index : 관리할 state
  setIndex : state값을 변경시킬 함수(newIndex값을 인수로 받아서 index값으로 set)
*/
export const useTabState = create(
  devtools((set) => ({
    index: 0,
    tabNum: {},
    setIndex: (newIndex) => set(() => ({ index: newIndex })),
    setTabNum: (newtabNum) => set(() => ({ tabNum: newtabNum }))
  }))
);

export const useTableListState = create(
  devtools((set) => ({
    tableContentList: [],
    totalCount: 0,
    setTableList: (newTableContentList) => set(() => ({ tableContentList: newTableContentList })),
    setTotalCount: (newTotalCount) => set(() => ({ totalCount: newTotalCount })),
    addTableContent: (newTableContent) => set(() => tableContentList.push(newTableContent))
  }))
);

export const Criteria = create(
  devtools((set) => ({
    pagenation: {},
    search: {},
    setPagenation: (newPagenation) => set(() => ({ pagenation: newPagenation })),
    setSearch: (newSearch) => set(() => ({ search: newSearch }))
  }))
);

export const useDetailCardState = create(
  devtools((set) => ({
    view: false,
    id: -1,
    setView: (newView) => set(() => ({ view: newView })),
    setId: (newId) => set(() => ({ id: newId }))
  }))
);
