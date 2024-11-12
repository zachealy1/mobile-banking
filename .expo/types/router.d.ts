/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/documents` | `/(tabs)/more` | `/(tabs)/spending` | `/_sitemap` | `/documents` | `/more` | `/spending`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
