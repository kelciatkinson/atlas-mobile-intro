import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import React, { Suspense, useEffect, useState } from 'react';
import { View } from 'react-native';

async function LoadDatabase() {
  const name = "activities.db";
  const dbPath = `${FileSystem.documentDirectory}SQLite/${name}`;
  const fileInfo = await FileSystem.getInfoAsync(dbPath);

  if(!fileInfo.exists) {
    const dbAsset = require("@/assets/" + name);
    const dbUri = Asset.fromModule(dbAsset).uri;

    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });

    await FileSystem.downloadAsync(dbUri, dbPath);
  }
}

function useDB() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    LoadDatabase().then(() => setLoaded(true));
  }, [])

  return { loaded };
}

export function DatabaseProvider({ children }: {children: React.ReactNode}) {
  const { loaded } = useDB();

  if(!loaded) {
    return null;
  }

  return (
    <Suspense fallback={ <View></View> }>
      <SQLite.SQLiteProvider useSuspense databaseName="activities.db">
        {children}
      </SQLite.SQLiteProvider>
    </Suspense>
  )
}
