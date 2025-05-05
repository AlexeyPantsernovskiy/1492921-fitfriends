export const TrainingOperation = {
  Trainings: {
    summary: 'Получение списка тренировок',
  },
  View: { summary: 'Получение карточки тренировки' },
  SpecialForYou: {
    summary: 'Получение списка тренировок, специально подобранных для Вас',
  },
  Purchase: { summary: 'Покупка тренировки' },
  Comments: { summary: 'Получение отзывов о тренировке' },
  Create: { summary: 'Создание новой тренировки' },
  Update: { summary: 'Редактирование тренировки' },
  Orders: { summary: 'Получение списка купленных тренировок' },
  OrdersTotal: { summary: 'Получение списка купленных тренировок с итогами' },
  CreateOrder: { summary: 'Покупка тренировки' },
  UpdateOrderState: { summary: 'Изменение состояния купленной тренировки' },
} as const;
