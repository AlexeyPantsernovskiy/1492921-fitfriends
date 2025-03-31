export const TrainingOperation = {
  Catalog: {
    summary: 'Получение списка всех доступных пользователю тренировок',
  },
  View: { summary: 'Получение карточки тренировки' },
  SpecialForYou: { summary: 'Получение списка тренировок, специально подобранных для Вас' },
  Purchases: { summary: 'Получение списка покупок тренировок' },
  Purchase: { summary: 'Покупка тренировки' },
  Comments: { summary: 'Получение отзывов о тренировке' },
} as const;
