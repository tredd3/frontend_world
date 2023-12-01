const notificationList = (state = [], action) => {
  switch (action.type) {
    case 'NOTIFICATION_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default notificationList;
