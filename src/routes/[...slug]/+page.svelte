<script lang="ts">
	export let data;

	function parseContentToHtml(content: object): string {
		function parseNode(node: any): string {
			if (node.type === 'root') {
				return node.children.map(parseNode).join('');
			} else if (node.type === 'text') {
				let { text } = node;
				text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
				// Escape special characters in the text
				if (node.bold) {
					// Wrap text in a <strong> tag
					text = `<strong>${text}</strong>`;
				}
				if (node.italic) {
					// Wrap text in a <em> tag
					text = `<em>${text}</em>`;
				}
				if (node.code) {
					// Wrap code in a <code> tag
					text = `<code>${text}</code>`;
				}
				return text;
			} else if (node.type === 'code_block') {
				// Wrap code block in a <pre> tag
				return `<pre><code>${node.value}</code></pre>`;
			} else if (node.type === 'html') {
				// Return the HTML as is
				return node.value;
			} else {
				const tag = node.type;
				return `<${tag}>${node.children.map(parseNode).join('')}</${tag}>`;
			}
		}
		return parseNode(content);
	}

	const richText = parseContentToHtml(data.page.body);
</script>

<article>
	<h1>{data.page.title}</h1>

	{@html richText}
</article>

<style>
	
</style>