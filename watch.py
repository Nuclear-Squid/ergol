import os
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class BuildHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory:
            return
        if event.src_path.endswith(('.yaml', '.toml')):
            file_path = event.src_path
            output_path = f"layouts/{os.path.basename(file_path).rsplit('.', 1)[0]}.json"
            print(f"Building {file_path} -> {output_path}")
            subprocess.run(["kalamine", "build", file_path, "--out", output_path])

if __name__ == "__main__":
    path = "layouts"
    event_handler = BuildHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    print("Watching for changes in .yaml and .toml files...")
    observer.start()
    try:
        while True:
            pass  # Keeps the script running
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
