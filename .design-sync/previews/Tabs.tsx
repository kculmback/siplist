import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@siplist/ui/components/tabs";

const note: React.CSSProperties = {
  margin: "12px 4px 0",
  fontSize: 14,
  color: "var(--muted-foreground)",
};

export function Default() {
  return (
    <div style={{ width: 380 }}>
      <Tabs defaultValue="music">
        <TabsList>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="audiobooks">Audiobooks</TabsTrigger>
        </TabsList>
        <TabsContent value="music">
          <p style={note}>Your saved albums and playlists.</p>
        </TabsContent>
        <TabsContent value="podcasts">
          <p style={note}>Shows you follow.</p>
        </TabsContent>
        <TabsContent value="audiobooks">
          <p style={note}>Titles in your library.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function Line() {
  return (
    <div style={{ width: 380 }}>
      <Tabs defaultValue="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p style={note}>A summary of this week’s listening.</p>
        </TabsContent>
        <TabsContent value="activity">
          <p style={note}>Recent plays and likes.</p>
        </TabsContent>
        <TabsContent value="settings">
          <p style={note}>Playback and privacy options.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
