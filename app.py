from flask import Flask, render_template, request, jsonify
import binascii

app = Flask(__name__)

# Function to read and modify the hex value in the .meta file
def modify_meta_file(file_path, old_value, new_value):
    try:
        # Open the .meta file in binary mode
        with open(file_path, 'rb') as file:
            content = file.read()

        # Convert content to hex
        hex_content = binascii.hexlify(content).decode('utf-8')

        # Replace old hex value with the new one
        modified_hex = hex_content.replace(old_value, new_value)

        # Convert the modified hex back to binary
        modified_content = binascii.unhexlify(modified_hex)

        # Write the modified content back to the file
        with open(file_path, 'wb') as file:
            file.write(modified_content)

        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/edit_meta', methods=['POST'])
def edit_meta():
    # Get file path and values from the request
    data = request.get_json()
    file_path = data.get('file_path')
    old_value = data.get('old_value', 'b00102')  # default old_value
    new_value = data.get('new_value', 'b00100')  # default new_value

    if not file_path:
        return jsonify({"error": "file_path is required"}), 400

    # Call the function to modify the .meta file
    success = modify_meta_file(file_path, old_value, new_value)

    if success:
        return jsonify({"message": "File updated successfully!"}), 200
    else:
        return jsonify({"error": "Failed to update the file"}), 500

if __name__ == '__main__':
    app.run(debug=True)
