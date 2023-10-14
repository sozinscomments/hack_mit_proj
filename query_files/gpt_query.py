import openai
from os import path

### Retrieves organization and api_key from text file ###
# Store the organization and api_key in a text file "openai_details.txt"
# in the following format:
#
# organization
# api_key

assert path.isfile("openai_details.txt"), "Must include openai_details file."

with open("openai_details.txt", 'r') as details_file:
    organization, api_key = [line.strip() for line in details_file.readlines()]

openai.organization = organization
openai.api_key = api_key

### Queries based on the input information ###
grade_level = int(input("Input grade level between 1 and 12: \n"))
num_qs = int(input("Input the number of questions you want: \n"))
total_qs = 2*(num_qs + 1)
content = f"{total_qs} math questions for a {grade_level}th grader. \
    Give a single numeric answer to each question. \
    Return each question with it's corresponding answer. \
    Label each question with 'Question 1', 'Question 2', and so on. \
    The answers should each be a single numeric value without units."

completion = openai.ChatCompletion.create(
    model = "gpt-3.5-turbo",
    messages = [{"role":"user", "content":content}]
)

reply_content = completion.choices[0].message.content

### Reformats generated questions as dictionary. (key,val)=(problem,answer) ###
question_and_answer = reply_content.split("\n")
on_question = True
questions, answers = [], []
for element in question_and_answer:
    if not element or element[0] not in {"Q", "A"}:
        continue
    colon_index = element.index(":")
    trimmed_element = element[colon_index + 1:]
    if on_question:
        questions.append(trimmed_element)
        on_question = False
    else:
        answers.append(trimmed_element)
        on_question = True

problems = dict(zip(questions, answers))

if __name__ == "__main__":
    for problem in problems:
        print("Q: {}\nA: {}".format(problem, problems[problem]))
