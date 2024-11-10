import os
import subprocess


def build_files():
    for root, _, files in os.walk("layouts"):
        for file in files:
            if file.endswith((".toml", ".yaml")):
                file_path = os.path.join(root, file)
                output_path = os.path.join(root, f"{os.path.splitext(file)[0]}.json")
                print(f"Building {file_path} -> {output_path}")
                subprocess.run(["kalamine", "build", file_path, "--out", output_path])


if __name__ == "__main__":
    build_files()
