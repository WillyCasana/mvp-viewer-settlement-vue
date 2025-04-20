import { boot } from 'quasar/wrappers';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

// Crea una instancia del cliente de consulta
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
  },
});

export default boot(({ app }) => {
  // Proporciona el plugin y el cliente a la aplicación
  app.use(VueQueryPlugin, {
    queryClient,
  });
}); 