#!/bin/env python3
""" Merge two corpus dictionaries. """

import json
from sys import argv


def merge(filenames, filecount):
    merged = {
        "symbols": {},
        "digrams": {},
    }

    # merge dictionaries
    for filename in filenames:
        with open(filename, "r") as corpus:
            data = json.load(corpus)
            for section in merged.keys():
                for key, count in data[section].items():
                    if key not in merged[section]:
                        merged[section][key] = 0.0
                    merged[section][key] += count / filecount

    # sort the merged dictionary by symbol frequency (requires CPython 3.6+)
    def sort_by_frequency(table, precision=2):
        sorted_dict = {}
        for (key, count) in sorted(table.items(), key=lambda x: -x[1]):
            freq = round(count, precision)
            if freq > 0:
                sorted_dict[key] = freq
        return sorted_dict

    results = {}
    results["corpus"] = ""
    results["symbols"] = sort_by_frequency(merged["symbols"])
    results["digrams"] = sort_by_frequency(merged["digrams"])
    return results


if __name__ == "__main__":
    argl = len(argv) - 1  # number of files to merge
    if argl >= 2:
        print(json.dumps(merge(argv[1:], argl), indent=4, ensure_ascii=False))
