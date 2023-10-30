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
    tab: {},
    setIndex: (newIndex) => set(() => ({ index: newIndex })),
    setTabNum: (newtabNum) => set(() => ({ tabNum: newtabNum })),
    setTab: (newtabNum) => set(() => ({ tab: newtabNum }))
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

export const useOrganizationChartState = create(
  devtools((set) => ({
    OrganizationChart: [],
    setOrganizationChartList: (newTableContentList) => set(() => ({ OrganizationChart: newTableContentList }))
  }))
);

export const useUserTableListState = create(
  devtools((set) => ({
    tableContentList: {},
    totalCount: 0,
    setTableList: (newTableContentList) => set(() => ({ tableContentList: newTableContentList })),
    setTotalCount: (newTotalCount) => set(() => ({ totalCount: newTotalCount })),
    addTableContent: (newTableContent) => set(() => tableContentList.push(newTableContent))
  }))
);

export const useCriteria = create(
  devtools((set) => ({
    now_page: 1,
    limit: 10,
    search: '',
    setPage: (new_Page) => set(() => ({ now_page: new_Page })),
    setLimit: (new_limit) => set(() => ({ limit: new_limit })),
    setSearch: (newSearch) => set(() => ({ search: newSearch }))
  }))
);

export const useDetailCardState = create(
  devtools((set) => ({
    view: false,
    id: -1,
    content: {},
    setView: (newView) => set(() => ({ view: newView })),
    setId: (newId) => set(() => ({ id: newId })),
    setContent: (newContent) => set(() => ({ content: newContent }))
  }))
);

export const useProfileState = create(
  devtools((set) => ({
    profile: {},
    setProfile: (newProfile) => set(() => ({ profile: newProfile }))
  }))
);
//TODO:관리자가 다른사람 프로필 수정할때 위에 프로필까지 수정되는 현상을 막기위해 하나 새로 만들기

export const useHasDrity = create(
  devtools((set) => ({
    hasDrity: false,
    setHasDrity: (hasDrity) => set(() => ({ hasDrity: hasDrity }))
  }))
);

export const useLeaveTab = create(
  devtools((set) => ({
    index: 0,
    setIndex: (newIndex) => set(() => ({ index: newIndex }))
  }))
);

export const useAccessPage = create(
  devtools((set) => ({
    accessPage: {},
    setAccessPage: (newAccessPage) => set(() => ({ accessPage: newAccessPage }))
  }))
);

export const useCalendarDrawer = create(
  devtools((set) => ({
    view: false,
    clickView: false,
    setView: (newView) => set(() => ({ view: newView })),
    setClickView: (newClickView) => set(() => ({ clickView: newClickView }))
  }))
);

export const useCalendarDate = create(
  devtools((set) => ({
    startDate: {},
    endDate: {},
    setStartDate: (newStartDate) => set(() => ({ startDate: newStartDate })),
    setEndDate: (newEndDate) => set(() => ({ endDate: newEndDate }))
  }))
);

//휴가결재내역(승인, 반려, 대기)
export const useAllApprovalState1 = create(
  devtools((set) => ({
    app: {},
    setApp: (newApp) => set(() => ({ app: newApp }))
  }))
);
//휴가결재내역(승인, 반려)
export const useApprovalState2 = create(
  devtools((set) => ({
    app: {},
    setApp: (newApp) => set(() => ({ app: newApp }))
  }))
);
//휴가결재내역(대기)
export const useUnApprovalState = create(
  devtools((set) => ({
    app: {},
    setApp: (newApp) => set(() => ({ app: newApp }))
  }))
);

//사용자의 휴가보유 현황
export const useLeaveState = create(
  devtools((set) => ({
    leave: {},
    setLeave: (newLeave) => set(() => ({ leave: newLeave }))
  }))
);
//모든 사용자의 휴가보유 현황
export const useAllLeaveState = create(
  devtools((set) => ({
    allLeave: {},
    setAllLeave: (newAllLeave) => set(() => ({ allLeave: newAllLeave }))
  }))
);
//사용자의 근태 현황
export const useAttendanceState = create(
  devtools((set) => ({
    attendance: {},
    setAttendance: (newAttendance) => set(() => ({ attendance: newAttendance }))
  }))
);

//사용자의 오늘 근태
export const useTodayState = create(
  devtools((set) => ({
    attend: {},
    setAttend: (newAttend) => set(() => ({ attend: newAttend }))
  }))
);
export const useCalendarEvent = create(
  devtools((set) => ({
    event: {},
    setEvent: (newEvent) => set(() => ({ event: newEvent }))
  }))
);

export const useCalendarEventClick = create(
  devtools((set) => ({
    title: '',
    allDay: false,
    setTitle: (newTitle) => set(() => ({ title: newTitle })),
    setAllDay: (newAllDay) => set(() => ({ allDay: newAllDay }))
  }))
);

export const useCalendarMemoModal = create(
  devtools((set) => ({
    memoView: false,
    setMemoView: (newMemoView) => set(() => ({ memoView: newMemoView }))
  }))
);
